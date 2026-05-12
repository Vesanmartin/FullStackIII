class ERPConnector {
    async fetchData() {
        return {
            source: "ERP",
            data: ["producto1", "producto2"]
        };
    }
}

module.exports = ERPConnector;