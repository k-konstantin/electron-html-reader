import React, { Component } from 'react';
import {CircularProgress, Backdrop, Button} from '@material-ui/core'

import ResourcesList from './ResourcesList'
import {getFileNameFromSrc} from '../store/selectors';
import styles from '../css/main.sass'

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
    componentDidUpdate(prevProps) {
        if (prevProps.isTakingScreenshots !== this.props.isTakingScreenshots) {
            this.onWindowResize()
        }
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
        if (this.props.isTakingScreenshots) {
            return
        }
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
        const { 
            animations, 
            selectedId, 
            isFetching, 
            selectAnimation, 
            openFolder, 
            revealInExplorer, 
            takeScreenShot,
            isTakingScreenshots,
            stopScreenShot,
        } = this.props;

        return (
            <div className={`${styles.page} ${isTakingScreenshots ? styles.sreenshots : ''}`}>
                <Backdrop classes={{root: styles.backdrop}} open={isFetching}>
                    <CircularProgress />
                </Backdrop>
                {isTakingScreenshots ? (
                    <div className={styles.stopScreenshotPanel}>
                        <Button variant="contained" color="primary" onClick={stopScreenShot}>
                            Остановить скриншоты
                        </Button>
                    </div>
                ) : (
                    <div className={styles.leftPanel}>
                        <Button variant="contained" color="primary" onClick={openFolder}>
                            Открыть папку
                        </Button>
                        <Button variant="contained" color="secondary" disabled={animations.length === 0} onClick={takeScreenShot}>
                            Распечатать
                        </Button>
                        {animations.length > 0 && (
                            <ResourcesList 
                                selectedId={selectedId}
                                animations={animations}
                                selectAnimation={selectAnimation}
                                revealInExplorer={revealInExplorer}
                            />
                        )}
                    </div>
                )}
                <div className={styles.contentContainer}>
                    <div className={styles.contentTitle} title={animations[selectedId]}>
                        {(animations[selectedId] && `${getFileNameFromSrc(animations[selectedId])} (${selectedId + 1} / ${animations.length})`) || 'Untitled'}
                    </div>
                    <div ref={this.iframeContainerRef} className={styles.iframeContainer}>
                        <iframe src={animations[selectedId]} style={this.state} />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
