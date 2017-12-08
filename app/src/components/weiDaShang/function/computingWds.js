/**
 * 微打赏计算
 */
import cheerio from 'cheerio';

/* 将html抽象成聚聚榜 */
/*
<li class="line1px">
  <span class="suport_ran">21</span>
  <a href="otuser_tmp?user_id=123">
    <span class="avatar">
      <img class="lazyload" data-original="" src="" onerror="">
    </span>
    <span class="nickname">昵称</span>
    <span class="money">￥ 400.00</span>
  </a>
</li>
*/
export function juju(xmlStr: string): { allMount: number, arr: Array, obj: Object }{
  const xml: any = cheerio.load(`<html id="xml">${ xmlStr }</html>`);
  const arr: Array = [];
  const obj: Object = {};
  let allMount: number = 0;
  xml("#xml").find("li").each((index: number, item: any): void=>{
    const item2: any = xml(item);
    const id: string = (item2.find('a').eq(0).attr('href')).match(/[0-9]+/)[0];                        // 用户id
    const nickname: string = item2.find('.nickname').text();                                           // 用户的昵称
    const money: Number = Number(item2.find('.money').text().match(/[0-9.,]+/)[0].replace(/,/g, ''));  // 用户的打赏金额
    const o: Object = {
      index,
      id,
      nickname,
      money
    };
    obj[id] = o;         // 无序
    arr.push(o);         // 有序
    allMount += money;   // 总金额
  });
  return {
    obj,
    arr,
    allMount: String(allMount.toFixed(2))
  };
}

/* 将html抽象成打卡榜 */
/*
<li class="line1px">
  <span class="suport_ran">1</span>
  <a href="otuser_tmp?user_id=123">
    <span class="avatar">
      <img class="lazyload" data-original="" src="" onerror="">
    </span>
    <span class="nickname">昵称</span>
    <span class="money">3天</span>
  </a>
</li>
*/
export function daka(xmlStr: string): Array{
  const xml: any = cheerio.load(`<html id="xml">${ xmlStr }</html>`);
  const arr: Array = [];
  xml("#xml").find("li").each((index: number, item: any): void=>{
    const item2: any = xml(item);
    const id: string = (item2.find('a').eq(0).attr('href')).match(/[0-9]+/)[0];     // 用户id
    const nickname: string = item2.find('.nickname').text();                        // 用户的昵称
    const day: string = item2.find('.money').text().match(/[0-9]+/)[0];             // 打赏天数
    arr.push({
      index,
      id,
      nickname,
      day
    });
  });
  return arr;
}

/* 计算变化成员 */
export function changeMembers(oldObj: Object, newArr: Array, from: number, to: number): Array{
  if(newArr.length === 0){
    return [];
  }
  // 判断集资是否变化
  if(from === to){
    const id: string = newArr[from].id;
    if(!oldObj[id] || (newArr[from].money > oldObj[id].money)){
      return [newArr[from]];
    }else{
      return [];
    }
  }

  const middle: number = Math.floor((to - from) / 2) + from;
  const left: Array = changeMembers(oldObj, newArr, from, middle);
  const right: Array = changeMembers(oldObj, newArr, middle + 1, to);
  return left.concat(right);
}
