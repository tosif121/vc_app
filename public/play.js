//const data = Math.floor(Date.now()/1000);

let LeadIDS = [];
//console.log(data);

for (let i = 0; i < 1000000; i++) {
    const leadid =(i+Math.floor(Date.now()/1000)/10000000000).toFixed(11);
    LeadIDS.push(leadid);
}
 console.log(LeadIDS[9000],LeadIDS[999001],LeadIDS[0],LeadIDS[1]);


