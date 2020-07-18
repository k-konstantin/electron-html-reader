import React from 'react';
import {List, ListItem, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import {FolderOpen} from '@material-ui/icons'

import {getFileNameFromSrc} from '../store/selectors';
import styles from '../css/ResourcesList.sass'

const ResourcesList = ({
    selectedId,
    animations,
    selectAnimation,
    revealInExplorer,
}) => {

    const onListItemClick = (index) => () => selectAnimation(index)
    const onRevealInExplorer = (path) => () => revealInExplorer(path)

    return (
        <List dense classes={{root: styles.root}}>
            {animations.map((path, index) => (
                <>
                    <ListItem 
                        key={path} 
                        button
                        divider
                        selected={selectedId === index}
                        title={path} 
                        onClick={onListItemClick(index)}
                    >
                        <ListItemText
                            primary={getFileNameFromSrc(path)}
                        />
                        <ListItemSecondaryAction>
                            <IconButton title={'Открыть в проводнике'} onClick={onRevealInExplorer(path)} edge="end">
                                <FolderOpen />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </>
            ))}
        </List>
    )
}

export default ResourcesList