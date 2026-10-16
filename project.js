const prompt = require("prompt-sync")();

 const rows=3;
 const cols=3;
const SYMBOLS_COUNT ={
     A:2, 
    B:6,
    C:8,
    D:10
}
const SYMBOL_VALUES ={
    A:5,
    B:4,
    C:3,
    D:2
}
const deposit = () => {
    while(true){
    const depositamount = prompt("ENTER THE DEPOSIT AMOUNT : ");
    const numberdepositamount = parseFloat(depositamount);

    if (isNaN(numberdepositamount) || numberdepositamount <= 0) {
        console.log("INVALID INPUT TRY AGAIN:");
    }
    else{
        return numberdepositamount;
    }
}
};


const betnumber = () => {
    while(true){
        const getline=prompt("ENTER THE NUMBER OF LINE TO BET ON (1-3) :");
        const getnumberline=parseFloat(getline);
        if(isNaN(getnumberline) || getnumberline<=0 || getnumberline>3){
            console.log("INVALID INPUT: ");
        }
        else{
            return getnumberline;
        }
    }
};

const getbet = (balance,lines) => {
    while(true){
    const betamount=prompt("ENTER THE BET AMOUNT PER LINE : ");
    const betvalid=parseFloat(betamount);
    if(isNaN(betvalid) || betvalid<=0 || betvalid>balance/lines){
        console.log("INVALID INPUT : ");
    }
    else{
        return  betvalid;
    }
    }
};

const spin = () => {
    const symbols=[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
         for(let i=0;i<count;i++){
            symbols.push(symbol);
         }
    }

    const reels = [];
    for(let i=0;i<cols;i++){
        reels.push([]);
        const reelSymbols=[...symbols];
        for(let j=0;j<rows;j++){
           const randomindex = Math.floor(Math.random()*reelSymbols.length);
           const selectedsymbol=reelSymbols[randomindex];
           reels[i].push(selectedsymbol);
           reelSymbols.splice(randomindex,1);
        }
    }
    return reels;
    

};
const transpose = (matrix) => {
    const Rows=[];
    for (let i=0;i<rows;i++){
        Rows.push([]);
        for(let j=0;j<cols;j++){
            Rows[i].push(matrix[j][i]);
        }
    }
    return Rows;
}
 const printRows = (Rows) =>{
    for (const row of Rows){
        let rowstring=" ";
        for (const [i,symbol] of row.entries()){
             rowstring +=symbol;
             if(i!=row.length-1) {
                rowstring +=" | "; 
             }  
        }
        console.log(rowstring);
    }
 };

 const getwinnings = (matrix,bet,lines) => {
    let winnings =0;
    for (let row=0;row<lines;row++){
        const symbols= matrix[row];
        let allsame=true;
        for(const symbol of symbols){
            if(symbol != symbols[0]) {
                allsame=false;
                break;

            }
        }
        if (allsame){
            winnings+=bet *SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
 };
 



const game = () => {
    let balance=deposit();


    while(true){
    
     
    const lines=betnumber();
    const bet=getbet(balance,lines);
    balance -=bet*lines;
    const matrix =spin();
    const t=transpose(matrix);
    printRows(t);
    const win=getwinnings(t,bet,lines);
    console.log("YOU WON  $  "+win);
    balance+=win;
    if (balance <=0){
        console.log("YOU RAN OUT OF BALANCE: ");
        break;
    }
    console.log("YOUR UPDATED BALANCE IS: $ "+balance);
    console.log("YOU WANNA BET AGAIN ? (y/n)");
    
    const again=prompt();
    if(again=='n'){
        break;
    }

    }

}
game();




