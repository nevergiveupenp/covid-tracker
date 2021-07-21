export declare interface NationalVaccinationDataProps {
    date: string;
    total_doses: number;
    first_dose: number;
    second_dose: number;
    sinovac_supply?: number;
    astrazeneca_supply?: number;
    total_supply?: number;
    daily_vaccinations?: number;
    missing_data?: boolean;
    deltaAvg?: number;
}

export declare interface ManufacturerDataProps {
    "date": string,
    "manufacturer": string,
    "doses_administered": number
}

export declare interface ProvincialVaccinationDataProps {
    update_at: string;
    data: {
        "name": string;
        "id": string;
        "population": number;
        "registered_population": number;
        "over-60-population": number;
        "coverage": number;
        "total_doses": number;
        "total-1st-dose": number;
        "total-2nd-dose": number;
        "over-60-1st-dose": number;
        "over-60-2nd-dose": number;
    }[]
}