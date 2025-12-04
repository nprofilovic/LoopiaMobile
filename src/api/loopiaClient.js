// src/api/loopiaClient.js
import axios from 'axios';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { API_URL } from '../utils/constants';

class LoopiaClient {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.baseURL = API_URL;
    
    this.parserOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    };
    
    this.parser = new XMLParser(this.parserOptions);
    this.builder = new XMLBuilder({ 
      format: true,
      ignoreAttributes: false,
      suppressEmptyNode: true,
    });
  }

  buildXMLRequest(methodName, params = []) {
    const xmlObject = {
      '?xml': {
        '@_version': '1.0',
        '@_encoding': 'UTF-8',
      },
      methodCall: {
        methodName: methodName,
        params: {
          param: [
            {
              value: {
                struct: {
                  member: [
                    {
                      name: 'username',
                      value: { string: this.username },
                    },
                    {
                      name: 'password',
                      value: { string: this.password },
                    },
                  ],
                },
              },
            },
            ...params.map(param => ({
              value: this.formatValue(param),
            })),
          ],
        },
      },
    };

    return this.builder.build(xmlObject);
  }

  formatValue(value) {
    if (typeof value === 'string') {
      return { string: value };
    } else if (typeof value === 'number') {
      return Number.isInteger(value) ? { int: value } : { double: value };
    } else if (typeof value === 'boolean') {
      return { boolean: value ? 1 : 0 };
    } else if (Array.isArray(value)) {
      return {
        array: {
          data: {
            value: value.map(v => this.formatValue(v)),
          },
        },
      };
    } else if (typeof value === 'object' && value !== null) {
      return {
        struct: {
          member: Object.keys(value).map(key => ({
            name: key,
            value: this.formatValue(value[key]),
          })),
        },
      };
    }
    return { string: String(value) };
  }

  parseXMLResponse(xmlString) {
    try {
      const result = this.parser.parse(xmlString);

      if (result.methodResponse?.fault) {
        const fault = result.methodResponse.fault.value.struct.member;
        const faultCode = fault.find(m => m.name === 'faultCode')?.value?.int;
        const faultString = fault.find(m => m.name === 'faultString')?.value?.string;
        
        throw {
          code: faultCode,
          message: faultString,
        };
      }

      return result.methodResponse?.params?.param?.value || null;
    } catch (error) {
      if (error.code) {
        throw error;
      }
      throw {
        code: 'PARSE_ERROR',
        message: 'Greška u parsiranju XML odgovora',
        original: error,
      };
    }
  }

  async call(methodName, params = []) {
    try {
      const xmlRequest = this.buildXMLRequest(methodName, params);
      
      const response = await axios.post(this.baseURL, xmlRequest, {
        headers: {
          'Content-Type': 'text/xml; charset=UTF-8',
        },
      });

      return this.parseXMLResponse(response.data);
    } catch (error) {
      if (error.code) {
        throw error;
      } else if (error.response) {
        throw {
          code: 'HTTP_ERROR',
          message: `HTTP ${error.response.status}: ${error.response.statusText}`,
          original: error,
        };
      } else if (error.request) {
        throw {
          code: 'NETWORK_ERROR',
          message: 'Greška u komunikaciji sa serverom',
          original: error,
        };
      } else {
        throw {
          code: 'UNKNOWN_ERROR',
          message: error.message || 'Nepoznata greška',
          original: error,
        };
      }
    }
  }
}

export default LoopiaClient;