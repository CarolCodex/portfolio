Place dashboard scene videos in this directory.

Runtime video rules:

- Keep autoplay scene videos H.264-compatible and at or below 720p when the source is larger than 5MB.
- Keep `lf.mp4` as the original lightweight source.
- Use the 720p optimized files for larger scenes: `lianzhu-720.mp4`, `gaolu-720.mp4`, `vd-720.mp4`, `zhuanlu-720.mp4`.
- Keep the original MP4 files as source backups only; the Vue config should point at optimized files when available.
