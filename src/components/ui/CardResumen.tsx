'use client';

import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

interface Props {
    title: string;
    icon: React.ReactNode;
    description?: string;
    contentList?: string[];
    color?: string; // Tailwind gradient classes
}

export default function CardResumen({
    title,
    icon,
    description,
    contentList,
    color = 'from-zinc-800 to-zinc-700',
}: Props) {
    return (
        <Box
            className={clsx(
                'rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.015]',
                'bg-gradient-to-br',
                color
            )}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                minHeight: 200,
                justifyContent: 'space-between',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
        >
            <Box display="flex" alignItems="center" gap={1}>
                <Box fontSize={28}>{icon}</Box>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
            </Box>

            {description && (
                <Typography variant="body2" sx={{ color: 'gray.300' }}>
                    {description}
                </Typography>
            )}

            {contentList && contentList.length > 0 && (
                <Box>
                    {contentList.map((item, idx) => (
                        <Typography
                            key={idx}
                            variant="body2"
                            sx={{ color: 'gray.400', fontSize: 14 }}
                        >
                            • {item}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
}
