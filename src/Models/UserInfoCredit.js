export const  CreditInfo = {
    dateRequest: '1992-20-21',
    agency:'',
    seller:'',
    financialAmount: '',
    timeLimmit:'',
    couta:'',
    entry:'',
    motorcycleModel:'',
    deudor:'',
    garante:''
}

export const referenceClient={
    name:'',
    relationShip:'',
    address:'',
    phone:''
}

export const UserInfoCredit = {
    typeIdentification : '',
    numberIdentification : '',
    dateBirth:'',
    firstNameClient:'',
    lastNameClient:'',
    nationality:'',
    statusCivil:'',
    familyBurdens:'',
    email:'',
    phone:'',
    linePhone:'',
    dataConyuge:{
        typeIdentification : '',
        numberIdentification : '',
        dateBirth:'',
        firstNameClient:'',
        lastNameClient:'',
        email:'',
        phone:'',
        linePhone:''
    },
    dataHome:{
        housingType:'',
        housingTime:'',
        address:'',
        reference:'',
        province:'',
        canton:'',
        parroquia:''
    },
    referenceClient:{
        referenceClientOne: referenceClient,
        referenceClientTwo: referenceClient,
        referenceClientThree: referenceClient
    },
    sourceIncome:{
        ownBusiness:{
            nameBusiness:'',
            timeBusiness:'',
            address:'',
            reference:'',
            phone:'',
            city:'',
            canton:'',
            provincia:''
        },
        privateEmployee:{
            nameCompany:'',
            timeCompany:'',
            isAfiliado:'',
            address:'',
            reference:'',
            phone:'',
            cargo:'',
            bossName:''
        }
    },
    economicActivityConyuge:{
        occupationJob:'',
        antiguedad:'',
        cargo:'',
        boss:'',
        phone:'',
        linePhone:'',
        address:''
    },
    informationEconomic:{
        income:{
            underDependence:"0",
            businessProfit:"0",
            other:"0",
            total:"0"
        },
        expenses:{
            familyMembers:"0",
            underDependence:"0",
            businessProfit:"0",
            other:"0",
            total:"0"
        },
        quotaAvailable:"0"
    },
    informationCount:{
        ownerIdentification: '',
        accountHolderName:'',
        accountNumber:'',
        typeAccount:'',
        entityInstituion:''
    }
}


