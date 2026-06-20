# Booth Kiosk — UI Kit

The SupaPark parking-booth touchscreen, as it runs on a 7" 1024×600 display (Raspberry Pi) at each lane gate. **Ultra-contrast pure black**, Bahasa Indonesia only, readable through a car window in garage glare.

- **`index.html`** — interactive simulator. Toggle **Exit** / **Entry**, step through every screen state.
- **`BoothScreens.jsx`** — all screens + the `BoothShell` frame + `BoothSimulator`.

### Screen states
**EXIT (6):** Idle · Scanning · Payment (QRIS) · Success · Member · Error
**ENTRY (4):** Idle · Scanning · Entry Success · Entry Member

### Rules baked in
Palette `#000 / #FFF / #999 / #F5A623 / #00FF88 / #FF3333`. Plate = JetBrains Mono 48px white. Fee = amber, large. QR ≥ 200px white-on-black. Touch targets ≥ 80px (`BoothButton`). Status discs use Lucide-style check/X, never emoji. Idle pulses; scanning sweeps a single amber line.
