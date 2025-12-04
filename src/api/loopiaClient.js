import axios from 'axios';
import { parseString, Builder } from 'xml2js';
import { API_URL } from '../utils/constants';

class LoopiaClient {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.baseURL = API_URL;
  }

  // Kreiraj XML-RPC zahtev
  buildXMLRequest(methodName, params = []) {
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });

    const xmlObject = {
      methodCall: {
        methodName: [methodName],
        params: {
          param: [
            // Prvi parametar je uvek auth
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
            // Ostali parametri
            ...params.map(param => ({
              value: this.formatValue(param),
            })),
          ],
        },
      },
    };

    return builder.buildObject(xmlObject);
  }

  // Formatiraj vrednost za XML
  formatValue(value) {
    if (typeof value === 'string') {
      return { string: value };
    } else if (typeof value === 'number') {
      return { int: value };
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
    } else if (typeof value === 'object') {
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

  // Parsiraj XML odgovor
  async parseXMLResponse(xmlString) {
    return new Promise((resolve, reject) => {
      parseString(xmlString, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        // Proveri da li ima fault (grešku)
        if (result.methodResponse?.fault) {
          const fault = result.methodResponse.fault.value.struct.member;
          const faultCode = fault.find(m => m.name === 'faultCode')?.value.int;
          const faultString = fault.find(m => m.name === 'faultString')?.value.string;
          
          reject({
            code: faultCode,
            message: faultString,
          });
          return;
        }

        // Uspešan odgovor
        resolve(result.methodResponse?.params?.param?.value);
      });
    });
  }

  // Glavni metod za pozivanje API-ja
  async call(methodName, params = []) {
    try {
      const xmlRequest = this.buildXMLRequest(methodName, params);
      
      const response = await axios.post(this.baseURL, xmlRequest, {
        headers: {
          'Content-Type': 'text/xml; charset=UTF-8',
        },
      });

      return await this.parseXMLResponse(response.data);
    } catch (error) {
      if (error.code) {
        // Loopia API greška
        throw error;
      } else {
        // Network ili parsing greška
        throw {
          code: 'NETWORK_ERROR',
          message: 'Greška u komunikaciji sa serverom',
          original: error,
        };
      }
    }
  }
}

export default LoopiaClient;