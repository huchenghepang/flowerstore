// 窗口信息
const windowInfo = wx.getWindowInfo()
// 胶囊按钮信息 
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
// 获取小程序的导航栏和状态栏信息
function getStatusInfo(){
  const diffTopHeight = menuButtonInfo.top-windowInfo.statusBarHeight;
  const diffLeftWidth = windowInfo.screenWidth -menuButtonInfo.right; 
  const navBarHeight = menuButtonInfo.height + (diffTopHeight) * 2 || 40;
  return {
    navBarHeight,
    statusBarHeight:windowInfo.statusBarHeight,
    navBarWidth:menuButtonInfo.width,
    topBarHeight:navBarHeight+windowInfo.statusBarHeight,
    menuButtonHeight:menuButtonInfo.height,
    menuButtonInfo,
    diffTopHeight,
    diffLeftWidth
  }
}
// 获取设备底部安全区域的高度
const getSafeBattomAreaHeight = ()=>{
  const SafeBattomAreaHeight  =  Math.abs(windowInfo.safeArea.bottom - windowInfo.windowHeight)
  console.log(SafeBattomAreaHeight);
  
  return SafeBattomAreaHeight || 0
};
// 获取内容的主体区域高度
function getMainContentHeight(){

  const diffTopHeight = menuButtonInfo.top-windowInfo.statusBarHeight;
  const topHeight = diffTopHeight + menuButtonInfo.bottom;
  // 设备的高度 - 顶部高度 - 底部高度 
  const height = windowInfo.screenHeight - topHeight - getSafeBattomAreaHeight() -48;
  
  return height
}


module.exports = {
  getStatusInfo,
  getSafeBattomAreaHeight,
  getMainContentHeight
}


