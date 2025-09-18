const businessSizeCalculator = (assetsValue) => {
    const SMMLV = parseInt(process.env.REACT_APP_SMMLV);
    const numberOfSalaries = assetsValue/SMMLV;
    if(numberOfSalaries < 500){
        return "Micro";
    }
    else if(numberOfSalaries<5000){
        return "Pequeña";
    }
    else if(numberOfSalaries<30000){
        return "Mediana";
    }
    else{
        return "Grande";
    }
};

export default businessSizeCalculator;