import React from "react";
import { Box, Drawer, CssBaseline, List } from "@mui/material";

const drawerWidth = '23vw';

export default function ClippedDrawer({children}) {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        marginTop: '8vh'
                    }
                }}
            >
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            {children}
                        </Box>
                    </List>
                </Box>
            </Drawer>
        </Box>
    )
}