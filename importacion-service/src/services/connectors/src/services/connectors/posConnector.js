class POSConnector {
    async fetchData() {
        return {
            source: "POS",
            data: ["venta1", "venta2"]
        };
    }
}

module.exports = POSConnector;