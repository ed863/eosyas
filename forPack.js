 result = 0.0002

 const {
     JsonRpc,
 } = require('eosjs');
 const fetch = require('node-fetch'); // node only; not needed in browsers

 const rpc = new JsonRpc('http://198.74.53.102:8888', {
     fetch
 });

 let message = {

 };

 window.ccc = async function getInfo() {

     try {
         let bal = await rpc.get_currency_balance('eosio.token', 'yasamm.x', 'YAS');
         message.yas = Number(bal[0].replace(" YAS", ""));
     } catch (error) {
         console.error(JSON.stringify(error));
     }

     try {
         let bal = await rpc.get_currency_balance('yasmptoken.x', 'yasamm.x', 'YASV');
         message.yasv = Number(bal[0].replace(" YASV", ""));
     } catch (error) {
         console.error(JSON.stringify(error));
     }

     try {
         let bal = await rpc.get_currency_stats('yasmptoken.x', 'YASV');
         message.yasvT = Number(bal.YASV.supply.replace(" YASV", ""));
     } catch (error) {
         console.error(JSON.stringify(error));
     }


     try {
         let bal = await rpc.get_currency_stats('yasmptoken.x', 'YASLP');
         message.yaslpT = Number(bal.YASLP.supply.replace(" YASLP", ""));
     } catch (error) {
         console.error(JSON.stringify(error));
     }


     try {
         let bal = await rpc.get_currency_balance('cpmcoin.x', 'yasmp.x', 'CPM');
         message.cpmY = Number(bal[0].replace(" CPM", ""));
     } catch (error) {
         console.error(JSON.stringify(error));
     }


     try {
         let amm = await rpc.get_table_rows({
             json: true,
             code: 'amm.x',
             scope: 'amm.x',
             table: 'ammtable',
             limit: 100,
             reverse: false,
             show_payer: false
         });
         message.amm = amm;
     } catch (error) {
         console.error(JSON.stringify(error));
     }




     try {
         console.log("--------------------------")
         ammdata = message.amm
         ammdata.rows.forEach((val) => {
             if (val.ticker === "EOS") {
                 message.cpmE = val.cpm / 10000
                 message.eos = val.token / 10000
             }
         })
         var eos2cpm = message.eos / message.cpmE
         var cpm2yasv = message.cpmY / (message.yaslpT * message.yaslpT / message.yasvT + message.yasvT);
         var yasv2yas = message.yasv / message.yas

         result = 1.013 / eos2cpm / cpm2yasv / yasv2yas
         console.log( "current value = "  + result)
         console.log('===========================')


     } catch (error) {
         console.log(JSON.stringify(error))
     }

 }

