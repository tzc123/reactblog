export default (props) => (
  <div className="loading">
    <div className={'progress' + (props.progress == 0 ? ' hidden' : '')} 
      style={{transform: `scaleX(${props.progress})`}}>
    </div>
  </div>
)