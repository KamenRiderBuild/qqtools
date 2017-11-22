import jQuery from 'jquery';
/**
 * name       配置名称
 * id         配置的id
 * groupName  监听的群名称
 * basic      基础配置
 * custom     自定义配置
 */
type interfaceOption = {
  name: string;
  groupName: string;
  time: number,
  basic: {
    isWds: boolean,
    wdsId: string,
    wdsTemplate: string,
    isWdsProblems: boolean,
    wdsProblems: Array,
    is48LiveListener: boolean,
    kd48LiveListenerMembers: string,
    isXinZhiTianQi: boolean,
    xinZhiTianQiAPIKey: string,
    xinZhiTianQiTemplate: string,
    isTuLing: boolean,
    tuLingAPIKey: string
  },
  custom: Object
};

function interfaceOption(value: Object, customProfiles: { command: string, text: string }[]): interfaceOption{
  const custom: Object = customProfilesArray2Obj(customProfiles);
  const inter: interfaceOption = {
    name: value.name,
    groupName: value.groupName,
    time: new Date().getTime(),
    basic: {
      // 微打赏
      isWds: value.isWds.length > 0,
      wdsId: value.wdsId,
      wdsUrlTemplate: value.wdsUrlTemplate,
      wdsTemplate: value.wdsTemplate,
      // 微打赏随机问题
      isWdsProblems: value.isWdsProblems.length > 0,
      wdsProblems: value.wdsProblems,
      // 口袋48监听
      is48LiveListener: value.is48LiveListener.length > 0,
      isListenerAll: value.isListenerAll.length > 0,
      kd48LiveListenerMembers: value.kd48LiveListenerMembers,
      // 新成员监听
      isNewBlood: value.isNewBlood.length > 0,
      newBloodTemplate: value.newBloodTemplate,
      // 天气
      isXinZhiTianQi: value.isXinZhiTianQi.length > 0,
      xinZhiTianQiAPIKey: value.xinZhiTianQiAPIKey,
      xinZhiTianQiTemplate: value.xinZhiTianQiTemplate,
      // 图灵机器人
      isTuLing: value.isTuLing.length > 0,
      tuLingAPIKey: value.tuLingAPIKey
    },
    custom
  };
  return inter;
}

/* 将Array转换成Obj */
function customProfilesArray2Obj(customProfiles: { command: string, text: string }[]): Object{
  const custom: Object = {};
  jQuery.each(customProfiles, (index: number, item: { command: string, text: string }): void=>{
    custom[item.command] = item.text;
  });
  return custom;
}

/* 将Obj转换成Array */
export function customProfilesObj2Array(customProfiles: Object): { command: string, text: string }[]{
  const custom: { command: string, text: string }[] = [];
  jQuery.each(customProfiles, (key: string, value: string): void=>{
    custom.push({
      command: key,
      text: value
    });
  });
  return custom;
}

export default interfaceOption;