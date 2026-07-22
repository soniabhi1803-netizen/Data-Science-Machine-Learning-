export interface AnalysisResult {
  prediction: string;
  confidence: number;

  filename: string;
  duration: number;
  sample_rate: number;

  rms_energy: number;
  spectral_centroid: number;
  spectral_bandwidth: number;

  noise_floor_db: number;
  dynamic_range: number;
  silence_ratio: number;

  waveform: string;
  mel_spectrogram: string;
  mfcc: string;
}