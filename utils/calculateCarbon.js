module.exports = (population, transportation, electricity, waste) => {
	const transportationFactor = 0.273; // metric tons CO2e per passenger vehicle mile
	const electricityFactor = 0.82; // metric tons CO2e per MWh
	const wasteFactor = 0.88; // metric tons CO2e per ton of waste

	const transportationEmissions = transportation * transportationFactor;
	const electricityEmissions = electricity * electricityFactor;
	const wasteEmissions = waste * wasteFactor;

	const totalEmissions = transportationEmissions + electricityEmissions + wasteEmissions;
	const perCapitaEmissions = totalEmissions / population;

	return {totalEmissions, perCapitaEmissions};
}