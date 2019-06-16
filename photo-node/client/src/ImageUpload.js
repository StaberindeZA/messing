import React from 'react';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();

    if(!this.fileInput.current.files.length) {
      console.log('zero resolves to false');
      return;
    }

    const file = {
      name: this.fileInput.current.files[0].name,
      type: this.fileInput.current.files[0].type,
      data: this.fileInput.current.files[0],
      url: URL.createObjectURL(this.fileInput.current.files[0])
    }
    this.props.onFormSubmit(file);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onFormClick();
  }


  render () {
    return (
      <div>
        <h2>Upload area here</h2>
        <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button onClick={this.handleClick}>Click</button>
      </form>
      </div>
    );
  }
}

export default ImageUpload;