const { h, Component } = require('preact')
const SnapshotButton = require('./SnapshotButton')
const RecordButton = require('./RecordButton')
const RecordingLength = require('./RecordingLength')
const VideoSourceSelect = require('./VideoSourceSelect')

function isModeAvailable (modes, mode) {
  return modes.indexOf(mode) !== -1
}

class CameraScreen extends Component {
  componentDidMount () {
    this.props.onFocus()
  }

  componentWillUnmount () {
    this.props.onStop()
  }

  render () {
    const shouldShowRecordButton = this.props.supportsRecording && (
      isModeAvailable(this.props.modes, 'video-only')
      || isModeAvailable(this.props.modes, 'audio-only')
      || isModeAvailable(this.props.modes, 'video-audio')
    )
    const shouldShowSnapshotButton = isModeAvailable(this.props.modes, 'picture')
    const shouldShowRecordingLength = this.props.supportsRecording && this.props.showRecordingLength
    const shouldShowVideoSourceDropdown = this.props.showVideoSourceDropdown && this.props.videoSources && this.props.videoSources.length > 1

    return (
      <div className="uppy uppy-Webcam-container">
        <div className="uppy-Webcam-videoContainer">
          <video className={`uppy-Webcam-video  ${this.props.mirror ? 'uppy-Webcam-video--mirrored' : ''}`} autoPlay muted playsinline srcObject={this.props.src || ''} />
        </div>
        <div className="uppy-Webcam-footer">
          <div className="uppy-Webcam-videoSourceContainer">
            {shouldShowVideoSourceDropdown ? VideoSourceSelect(this.props) : null}
          </div>
          <div className="uppy-Webcam-buttonContainer">
            {shouldShowSnapshotButton ? SnapshotButton(this.props) : null}
            {' '}
            {shouldShowRecordButton ? RecordButton(this.props) : null}
          </div>
          <div className="uppy-Webcam-recordingLength">
            {shouldShowRecordingLength ? RecordingLength(this.props) : null}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = CameraScreen
