import ChannelService from "../Component/User/ChannelService.js";

export function initializeChannelService() {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "a1686aea-ea22-4974-92b8-328583625997",
  });
}
