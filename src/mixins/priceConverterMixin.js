import Web3 from 'web3';

export default {
    methods: {
        convertPatentPriceToWei(patentPrice) {
            patentPrice.customPrice = Web3.utils.toWei(
                String(patentPrice.customPrice),
                "ether"
            );
            patentPrice.licensePrice = Web3.utils.toWei(
                String(patentPrice.licensePrice),
                "ether"
            );
            patentPrice.baseSalePrice = Web3.utils.toWei(
                String(patentPrice.baseSalePrice),
                "ether"
            );
            patentPrice.additiveLicenseValue = Web3.utils.toWei(
                String(patentPrice.additiveLicenseValue),
                "ether"
            );
            patentPrice.licenseTimedPrice = Web3.utils.toWei(
                String(patentPrice.licenseTimedPrice),
                "ether"
            );
            return patentPrice;
        },

        convertWeiPriceToPatent(patentPrice) {
            patentPrice.customPrice = Web3.utils.fromWei(patentPrice.customPrice, "ether");
            patentPrice.licensePrice = Web3.utils.fromWei(patentPrice.licensePrice, "ether");
            patentPrice.baseSalePrice = Web3.utils.fromWei(patentPrice.baseSalePrice, "ether");
            patentPrice.additiveLicenseValue = Web3.utils.fromWei(patentPrice.additiveLicenseValue, "ether");
            patentPrice.licenseTimedPrice = Web3.utils.fromWei(patentPrice.licenseTimedPrice, "ether");
            return patentPrice;
        },

        getDisplayPrice(patent) {
            if (patent.price.customPrice != 0) {
                patent.price.salePrice = patent.price.customPrice;
            }
            else {
                patent.price.salePrice = parseInt(patent.price.baseSalePrice) + patent.licensesSold * patent.price.additiveLicenseValue;
            }
        }
    }
}