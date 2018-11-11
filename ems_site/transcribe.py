import nltk
import os
import io
from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

def transcribe():
    path = os.getcwd()
    path += '/data/'
    file_name = []
    for i in os.listdir(path):
        file_name.append(path + i)
    # Instantiates a client
    client = speech.SpeechClient()
    # Loads the audio into memory
    with io.open(file_name[0], 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=22050,
        language_code='en-US')
    # Detects speech in the audio file
    response = client.recognize(config, audio)
    for result in response.results:
        print('Transcript: {}'.format(result.alternatives[0].transcript))
    with io.open(file_name[1], 'rb') as audio_file:
        content = audio_file.read()
        audio = types.RecognitionAudio(content=content)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=44100,
        language_code='en-US')
    # Detects speech in the audio file
    response = client.recognize(config, audio)
    for result in response.results:
        print('Transcript: {}'.format(result.alternatives[0].transcript))
transcribe()