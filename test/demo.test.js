/**
 * @description test demo
 * @author EricWXY
 */

function sum(a,b){
  return a+b
}


test('expect 10+20=30',()=>{
  const res = sum(10,20)
  expect(res).toBe(30)
})