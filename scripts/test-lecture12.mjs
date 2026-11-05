import assert from 'node:assert/strict';
import { calculate, cis, magnitude, argument, power, roots, complexText, numberText, riskProbability, bestKeep, yahtzeeChance, optimalYahtzeeProbability, legalPairings, pairProbability, pairTotals, waitingTrial } from '../src/lib/lecture12.ts';
const close=(a,b,tolerance=1e-10)=>assert.ok(Math.abs(a-b)<=tolerance*Math.max(1,Math.abs(b)),`${a} ≠ ${b}`);
const zclose=(a,b)=>{assert.ok(a);close(a.re,b.re);close(a.im,b.im);};
zclose(calculate({re:2,im:1},{re:1,im:2},'add'),{re:3,im:3});
zclose(calculate({re:2,im:1},{re:1,im:2},'sub'),{re:1,im:-1});
zclose(calculate({re:3,im:-1},{re:1,im:1},'div'),{re:1,im:-2});
zclose(calculate({re:2,im:1},{re:0,im:0},'conj'),{re:2,im:-1});
assert.equal(calculate({re:1,im:0},{re:0,im:0},'div'),null);
zclose(calculate({re:1,im:0},{re:1e-200,im:0},'div'),{re:1e200,im:0});
assert.equal(calculate({re:1,im:0},{re:1e-320,im:0},'div'),null);
const multiplied=calculate({re:Math.sqrt(3),im:1},{re:1,im:1},'mul');
close(argument(multiplied),75);close(magnitude(multiplied),2*Math.sqrt(2));
assert.equal(argument({re:0,im:0}),null);close(argument({re:-3,im:3}),135);
assert.equal(cis(2,90).re,0);assert.equal(complexText({re:1,im:-2}),'1 − 2i');
assert.equal(numberText(1e-12),'1e-12');
for(const [target,n] of [[{re:8,im:0},3],[{re:-81,im:0},4],[{re:0,im:16},4],[{re:1,im:0},12]]){
  const solutions=roots(target,n);assert.equal(solutions.length,n);
  for(const root of solutions)zclose(power(root,n),target);
}
assert.deepEqual(roots({re:0,im:0},5),[{re:0,im:0}]);
close(riskProbability(1,1),15/36);close(riskProbability(2,1),125/216);close(riskProbability(2,2),505/1296);
close(optimalYahtzeeProbability(),221/17496);
assert.deepEqual(bestKeep([2,3,2,3,6]),[true,false,true,false,false]);
close(yahtzeeChance([1,2,3,4,5],[false,false,false,false,false]),1/1296);
assert.equal(yahtzeeChance([1,2,3,4,5],[true,true,false,false,false]),0);
close(yahtzeeChance([2,2,2,4,5],[true,true,true,false,false]),1/36);
close(pairProbability(2),19/144);close(pairProbability(7),139/216);
const splits=[[[0,1],[2,3]],[[0,2],[1,3]],[[0,3],[1,2]]];
let verified=0;
for(let code=0;code<1296;code++){
  let rest=code;
  const dice=Array.from({length:4},()=>{const v=rest%6+1;rest=Math.floor(rest/6);return v;});
  for(const active of [[],[2,3],[2,3,12],[6,7,8]]){
    // Independent oracle: try all move subsets of each pairing and retain
    // those that move as many dice-pairs as the runner limit permits.
    const expected=new Set();
    splits.forEach((pairs,index)=>{
      const sums=pairs.map(([a,b])=>dice[a]+dice[b]);
      const possible=[];
      for(let mask=1;mask<4;mask++){
        const moves=sums.filter((_,i)=>mask&(1<<i));
        if(new Set([...active,...moves]).size<=3)possible.push(moves);
      }
      const maximum=Math.max(0,...possible.map(v=>v.length));
      possible.filter(v=>v.length===maximum).forEach(v=>expected.add(`${index}:${v.join(',')}`));
    });
    const actual=new Set(legalPairings(dice,active).map(v=>`${v.pairing}:${v.moves.join(',')}`));
    assert.deepEqual(actual,expected,`Legal moves for ${dice}, active ${active}`);verified++;
  }
}
assert.equal(legalPairings([2,3,4,5],[2,3,12]).length,0);
assert.ok(legalPairings([2,3,4,5],[]).some(v=>v.moves.join(',')==='7,7'));
const sequence=values=>{let i=0;return()=>values[i++%values.length];};
assert.deepEqual(waitingTrial('heads',sequence([.9,.1,.9,.1,.1])),{completed:true,value:5});
assert.deepEqual(waitingTrial('penalty',sequence([.99,.99,.4])),{completed:true,value:-7});
assert.deepEqual(waitingTrial('tail',()=>0,3),{completed:false,value:0});
let seed=123456789;
const rng=()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/2**32;};
for(const [mode,expected] of [['heads',6],['tail',2],['penalty',2]]){
  let sum=0;for(let i=0;i<50000;i++){const trial=waitingTrial(mode,rng);assert.ok(trial.completed);sum+=trial.value;}
  close(sum/50000,expected,.02);
}
console.log(`PASS: complex arithmetic, zero/small denominators, powers/roots, exact Risk/Yahtzee/Can’t Stop probabilities, ${verified} legal-move states, and waiting-time simulations.`);
