import ChannelService from "../Component/User/ChannelService.js";

let isChannelIOInitialized = false;

export function initializeChannelService() {
  if (isChannelIOInitialized) {
    return;
  }

  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "a1686aea-ea22-4974-92b8-328583625997",
  });

  isChannelIOInitialized = true;
}
