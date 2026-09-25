# SME GUI: narration and timing analysis

Analyzed 2026-09-24 for the 16:9 screen-recording MVP. The recording controls the edit; the screenplay's timecodes are ignored.

## Sources and method

- Narration: `Promovideo/Narration/ElevenLabs_2026-09-24T14_11_33_Mark - Natural Conversations_pvc_sp100_s44_sb75_se0_b_m2.mp3`.
- Screenplay: `Promovideo/Drehbuch für einen kurzen Videoclip.docx`.
- Source directory: `/Users/Kai.Unterrainer/Library/CloudStorage/OneDrive-world-direct.at/Marketing - Dokumente/WD/Projekte/SME GUI Huawei/Promovideo`.
- Screenplay text extracted directly from the DOCX XML.
- Recording transcribed locally with `faster-whisper 1.2.1`, `Systran/faster-whisper-base.en`, CPU int8, beam size 5, English, word timestamps. The package and model were downloaded; no source audio or screenplay was uploaded. Inference ran with `HF_HUB_OFFLINE=1` and `local_files_only=True`.
- Local Apple Speech was checked first; no English transcription assets were installed, so no system model installation or permission prompt was requested.
- Audio was decoded and measured with FFmpeg, including silence, sample peak, true peak and EBU R128 loudness analysis.
- This is machine transcription and signal inspection, **not a claim of subjective listening**. Word timestamps are approximate, especially the first word after a long pause. Final edit decisions use measured pauses as well as the transcription.

Raw evidence is under `output/sme-gui-mvp/work/analysis/`: `screenplay.txt`, `narration-transcription.json`, `audio-analysis.log`, `loudness-analysis.log`, and local transcription scripts.

## Recorded narration

1. Managing networks for small and medium enterprises shouldn't require specialist knowledge. Yet traditional tools are often too technical and complex for everyday users.
2. That's why we created a new experience. Built especially for small and medium business customers.
3. Get an instant overview of all locations and key network metrics in a single dashboard.
4. Easily view and configure Wi-Fi networks without digging through complicated technical settings.
5. See all network devices and connected clients at a glance, including easy-to-read health ratings that help identify issues before they become problems.
6. Track every network change in one place, making troubleshooting faster and enabling users to resolve issues on their own.
7. Less complexity. Fewer support requests. Complete control of your network.
8. Network management made simple.

The final claim is **spoken in the recording**, although the screenplay lists it as on-screen text. Preserve it in this MVP's narration. The separate initial brief line “Your Network. Simply Managed.” is not what the audio's final claim says.

## Timing for the picture edit

Times refer to the untrimmed source MP3. Picture cuts may precede a sentence slightly so the right page is already readable when the narrator identifies it. No trimming or retiming of the narration is needed.

| Beat | Approximate spoken range | Useful picture cut at 30 fps | Picture content |
| --- | --- | --- | --- |
| Problem | 0.00–9.77 s | 0.00 s / frame 0 | Old NCE tool; begin with the complex source section around 43 s requested by the user. |
| New experience | 10.42–16.13 s | 10.30 s / frame 309 | Switch to new SME GUI. |
| Overview | 16.78–21.94 s | 16.90 s / frame 507, if a distinct shot is useful | New-tool dashboard / locations and metrics. It can continue naturally from the preceding shot. |
| Wi-Fi | 22.74–27.62 s | 22.87 s / frame 686 | Wi-Fi list/configuration. |
| Devices | 28.18–29.86 s | 28.40 s / frame 852 | Network device list. |
| Clients / health | 30.12–36.33 s | 30.03 s / frame 901 | Connected clients, then health ratings. “Health” is aligned at approximately 33.08 s. |
| Changes | 37.04–43.94 s | 37.13 s / frame 1114 | Change history / audit overview. |
| Closing / claim | 44.67–51.66 s | 44.50 s / frame 1335 | Calm new-tool screen, such as dashboard. The MVP only uses the recordings plus narration. |
| Audio tail | 51.66–52.062 s | Hold through at least frame 1562 | Preserve the original end; frame 1562 exclusive would be 52.067 s at 30 fps. |

The apparent early ASR starts at 16.78, 22.74, 28.18 and 37.04 s include part of the silence before the respective words. At a −35 dBFS silence threshold, substantial voice energy resumes at 17.200, 23.099, 28.702 and 37.402 s. The proposed picture cuts sit in those pauses. This makes the intended page present before the audible word rather than chasing an unreliable first-word ASR timestamp.

Reliable fine alignment within the devices/clients sentence from local ASR:

| Phrase | Time |
| --- | --- |
| network devices | 29.08–29.86 s |
| and connected clients | 29.86–30.74 s |
| at a glance | 30.74–31.32 s |
| including easy-to-read | 31.92–33.08 s |
| health ratings | 33.08–33.64 s |

## Audio measurements

| Property | Measured value |
| --- | --- |
| Decoded duration | 52.062041 s / 2,295,936 samples |
| Codec | MP3, nominal 128 kbit/s |
| Channels / sample rate | Mono / 44,100 Hz |
| Integrated loudness | −26.0 LUFS |
| Loudness range | 3.4 LU |
| Sample peak | −6.5 dBFS |
| True peak | −6.4 dBTP |
| End silence below −35 dBFS | Approximately 0.40 s |

FFmpeg decoding completed without audio decode errors. The measured source has ample peak headroom and no sample clipping. The full script was recognized consistently by the local ASR. A static gain of +4 dB would give approximately −22.0 LUFS / −2.4 dBTP without changing speech timing; actual encoded-output loudness and peak should be checked after rendering. No subjective claim about voice tone, noise, or listening comfort is made from those measurements alone.

## Technical references

- [faster-whisper source and usage](https://github.com/SYSTRAN/faster-whisper)
- [Apple SpeechAnalyzer overview](https://developer.apple.com/videos/play/wwdc2025/277/)
