import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bmi,category,weightRange,energy} from '../dist/calculations.js';
test('BMI formula and all WHO adult boundaries',()=>{assert.equal(bmi(80,200),20);for(const [v,c] of [[18.49,'Untergewicht'],[18.5,'Normalgewicht'],[24.99,'Normalgewicht'],[25,'Übergewicht'],[29.99,'Übergewicht'],[30,'Adipositas']])assert.equal(category(v),c);assert.deepEqual(weightRange(200),[74,99.6]);});
test('Mifflin formula, activity and percent deficit',()=>{const r=energy({weight:80,height:180,age:30,sex:'male',activity:1.55,deficit:.15});assert.equal(r.resting[0],1780);assert.equal(r.total[0],2759);assert.equal(r.target[0],2345.15);assert.equal(r.needsAdvice,false);});
test('formula range retains both endpoints',()=>{const r=energy({weight:75,height:170,age:28,sex:'range',activity:1.55,deficit:.1});assert.deepEqual(r.resting,[1511.5,1677.5]);assert.ok(r.target[0]<r.target[1]);});
test('underweight and low energy estimates prevent a target',()=>{const d={weight:40,height:170,age:30,sex:'female',activity:1.2,deficit:.2};assert.equal(energy(d).underweight,true);assert.equal(energy({...d,weight:65}).needsAdvice,true);assert.equal(energy({...d,weight:65,deficit:.1}).needsAdvice,false);});
