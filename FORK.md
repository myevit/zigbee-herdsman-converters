# Personal fork maintenance

This is Victor's personal fork of [Koenkk/zigbee-herdsman-converters](https://github.com/Koenkk/zigbee-herdsman-converters), maintained with assistance from **TARS, an AI assistant under Victor's control**. Fork changes are AI-assisted, not represented as human-only work. This fork is not endorsed by upstream and is not an upstream contribution or release.

## Branches and scope

- `yoolax-dual-rail` is the fork's default working branch, based on upstream commit `c18c32d94`. It includes the existing recognition and reporting corrections plus presentation changes and regression tests.
- `master` remains the branch inherited when the fork was created; it is not the fork's working branch and does not receive these changes.
- Recognition adds only the exact public `YKV24SAED` / `Yooksmart` identity to the native `TS0301_dual_rail` definition while retaining its existing fingerprints.
- The definition exposes native top and bottom rail covers, ordered top first, with explicit control and opening-percentage labels. Property and endpoint names remain unchanged.
- Target echoes and command acknowledgements do not supply measured position or completed state. Actual position reports update only their own rail. Outbound targets are validated before sending.
- These behavior changes also affect the existing variants sharing `TS0301_dual_rail`; offline regression tests do not prove physical behavior for every variant.

## Maintenance and qualification

Keep upstream as the `upstream` remote and this personal fork as `origin`. Review upstream changes before merging them into the working branch, then rerun checks, build and tests with a Node version supported by `package.json`. Do not force-push or rewrite upstream history. No automatic synchronization, release publishing, or deployment is configured by this fork maintenance work.

Repository tests exercise SDK conversion and stubbed transport, not real motors. Publishing this source does not deploy it to Zigbee2MQTT or Home Assistant and does not qualify live movement, discovery migration, or device-specific calibration. Installation and physical qualification are separate decisions.

The original MIT license, copyright notices, authorship and upstream policy files remain intact. The README's npm badge and upstream documentation refer to the original project, not a published package from this fork. Upstream contributions and communications must separately comply with upstream's current contribution and AI policies; creating this fork does not grant permission to submit them.
