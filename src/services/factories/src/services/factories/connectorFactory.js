const ERPConnector = require('../connectors/erpConnector');
const CRMConnector = require('../connectors/crmConnector');
const POSConnector = require('../connectors/posConnector');

class ConnectorFactory {
    static createConnector(type) {
        switch (type) {
            case 'ERP':
                return new ERPConnector();
            case 'CRM':
                return new CRMConnector();
            case 'POS':
                return new POSConnector();
            default:
                throw new Error('Fuente no soportada');
        }
    }
}

module.exports = ConnectorFactory;