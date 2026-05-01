class CRMConnector {
    async fetchData() {
        return {
            source: "CRM",
            data: ["cliente1", "cliente2"]
        };
    }
}

module.exports = CRMConnector;