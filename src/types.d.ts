export type TOperatorPrices = {
    operatorName: string;
    total: number;
    link: string;
    currentOperator: boolean;
    pricesAndLinksPerSize: { price: string; link: string; size: string }[];
};
