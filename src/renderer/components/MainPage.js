import React, { Component } from 'react';

class MainPage extends Component {
    state = {
        left: 0,
        top: 0,
        transform: '',
    };
    constructor(props) {
        super(props);
        this.iframeContainerRef = React.createRef();
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        document.addEventListener('keydown', this.onKeyUp);
        this.onWindowResize();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        document.removeEventListener('keydown', this.onKeyUp);
    }
    onKeyUp(event) {
        if (event.key === 'ArrowRight') {
            this.props.nextAnimation();
        } else if (event.key === 'ArrowLeft') {
            this.props.prevAnimation();
        }
    }
    onWindowResize = () => {
        this.setState(this.getContentStyle());
    };
    getContentStyle = () => {
        const WIDTH = 1280;
        const HEIGHT = 800;

        const containerRef = this.iframeContainerRef.current;
        const scaleX = containerRef.offsetWidth / WIDTH;
        const scaleY = containerRef.offsetHeight / HEIGHT;
        const scale = Math.min(scaleX, scaleY);
        const left = scaleY < scaleX ? (containerRef.offsetWidth - WIDTH * scale) * 0.5 : 0;
        const top = scaleX < scaleY ? (containerRef.offsetHeight - HEIGHT * scale) * 0.5 : 0;

        return {
            transform: `scale(${scale})`,
            left,
            top,
        };
    };
    render() {
        const { animations, selectedId, isFetching, selectAnimation, openFolder, revealInExplorer } = this.props;

        return (
            <div className='page'>
                <div className='left-panel'>
                    <button className='open-folder-btn' onClick={openFolder}>
                        Открыть папку
                    </button>
                    <div className='resources-list'>
                        {isFetching ? (
                            <div>Loading</div>
                        ) : (
                            animations.map((path, index) => (
                                <div key={path} className={index === selectedId ? 'btn selected' : 'btn'}>
                                    <div className='resource-title' title={path} onClick={event => selectAnimation(index)}>
                                        {path.slice(path.lastIndexOf('\\') + 1)}
                                    </div>
                                    <div className='open-resource-in-explorer-btn' title='Открыть в проводнике' onClick={event => revealInExplorer(path)}>
                                        <i class='far fa-folder' />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className='content-container'>
                    <div className='content-title' title={animations[selectedId]}>
                        {(animations[selectedId] && animations[selectedId].slice(animations[selectedId].lastIndexOf('\\') + 1)) || 'Untitled'}
                    </div>
                    <div ref={this.iframeContainerRef} className='iframe-container'>
                        <iframe src={animations[selectedId]} style={this.state} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
