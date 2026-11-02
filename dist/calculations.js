export function bmi(weight, height) { return weight / (height / 100) ** 2; }
export function category(value) { return value < 18.5 ? 'Untergewicht' : value < 25 ? 'Normalgewicht' : value < 30 ? 'Übergewicht' : 'Adipositas'; }
export function weightRange(height) { const h2 = (height / 100) ** 2; return [18.5 * h2, 24.9 * h2]; }
export function energy({weight,height,age,sex,activity,deficit}) {
 const base = 10 * weight + 6.25 * height - 5 * age;
 const resting = sex === 'range' ? [base-161,base+5] : [base + (sex === 'male' ? 5 : -161)];
 const total = resting.map(x => x * activity);
 const reduction = total.map(x => x * deficit);
 const target = total.map((x,i) => x-reduction[i]);
 const floor = sex === 'female' ? 1200 : 1500;
 return {resting,total,reduction,target,underweight:bmi(weight,height)<18.5,needsAdvice:target.some((x,i)=>x<floor || x<resting[i])};
}
