import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Box, Card, Divider, Paper, Typography} from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage.ts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Setting = () => {
    const {t, i18n} = useTranslation();
    const [loading, setLoading] = useState(false)

    const handleChange = (event: SelectChangeEvent) => {
        const len = event.target.value as string
        setLoading(true)
        i18n.changeLanguage(len)
            .finally(() => setLoading(false))
    };
    const langsFromResources = Object.keys(i18n.options.resources || {});
    const langsFromSupported = i18n.options.supportedLngs
        ? (i18n.options.supportedLngs.filter(l => l !== 'cimode'))
        : langsFromResources;

    const availableLangs = langsFromSupported.length
        ? langsFromSupported
        : langsFromResources;


    return (
        <Box padding={5}>
            <Paper sx={{padding: 4}}>
                <Box paddingY={2}>
                    <Typography variant="h3">
                        {t("setting.title")}
                    </Typography>
                </Box>
                <Divider />
                <Box paddingY={2}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">{t('setting.lang.title')}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={i18n.language}
                            label={t('setting.lang.title')}
                            onChange={handleChange}
                        >
                            {availableLangs.map((l,i) => (
                                <MenuItem value={l} key={i}>{t(`setting.lang.${l}`)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Paper>
        </Box>
    );
};

export default Setting;
