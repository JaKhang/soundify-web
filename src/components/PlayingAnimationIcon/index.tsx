import React from 'react';
import {Box, styled} from "@mui/material";

const PlayingAnimationIcon = styled(Box)(({ theme }) => ({
    width: "14px",
    aspectRatio: "1",
    display: "inline-block",
    "--c": `no-repeat linear-gradient(${theme.palette.primary.main} 0 0)`,
    background: `
    var(--c) 0%   100%,
    var(--c) 50%  100%,
    var(--c) 100% 100%
  `,
    animation: "l2 0.5s infinite linear",
    "@keyframes l2": {
        "0%": { backgroundSize: "20% 100%,20% 100%,20% 100%" },
        "20%": { backgroundSize: "20% 60%,20% 100%,20% 100%" },
        "40%": { backgroundSize: "20% 80%,20% 60%,20% 100%" },
        "60%": { backgroundSize: "20% 100%,20% 80%,20% 60%" },
        "80%": { backgroundSize: "20% 100%,20% 100%,20% 80%" },
        "100%": { backgroundSize: "20% 100%,20% 100%,20% 100%" },
    },
}));

export default PlayingAnimationIcon;
