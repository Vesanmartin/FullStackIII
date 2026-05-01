const ConnectorFactory = require('./factories/connectorFactory');

class ImportService {

    async importData(sourceType) {
        const connector = ConnectorFactory.createConnector(sourceType);

        const data = await connector.fetchData();

        // simulamos transformación (ETL)
        return {
            ...data,
            processedAt: new Date()
        };
    }
}

module.exports = new ImportService();