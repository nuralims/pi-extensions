import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import summariesFactory from "./packages/pi-summaries/extensions/summaries/index.ts";

export default function (pi: ExtensionAPI) {
  let recapCommand: any;
  const origRegisterCommand = pi.registerCommand.bind(pi);
  pi.registerCommand = (name: string, def: any) => {
    if (name === "recap") {
      recapCommand = def;
    }
    return origRegisterCommand(name, def);
  };

  summariesFactory(pi);

  if (recapCommand) {
    origRegisterCommand("rekap", {
      ...recapCommand,
      description: "Alias bahasa Indonesia untuk /recap (konfigurasi ringkasan eksekusi)",
    });
    origRegisterCommand("ringkasan", {
      ...recapCommand,
      description: "Alias bahasa Indonesia untuk /recap (konfigurasi ringkasan eksekusi)",
    });
  }
}
