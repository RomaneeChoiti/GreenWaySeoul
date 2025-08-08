
const common = {
    PINK_200: '#FAE2E9',
    PINK_400: '#EC87A5',
    PINK_500: '#BF5C79',
    PINK_700: '#C63B64',
    BLUE_500: '#0D8AFF',
    RED_500: '#FF5F5F',
    RED_300: '#FFB4B4',
    BLUE_400: '#B4E0FF',
    YELLOW_400: '#FFE594',
    YELLOW_500: '#FACC15',
    PURPLE_400: '#C4C4E7',
    UNCHANGE_WHITE: '#FFF',
    UNCHANGE_BLACK: '#000',
    UNCHANGE_GRAY_100: '#F8F8F8',
    UNCHANGE_GRAY_200: '#E7E7E7',
    UNCHANGE_GRAY_300: '#D8D8D8',
    UNCHANGE_GRAY_500: '#8E8E8E',
    UNCHANGE_GRAY_700: '#575757',
};

const colors = {
    PRIMARY: '#BEEE05',
    DARK_PRIMARY: '#A2D200',
    WARNING: '#D32F2F',
    light: {
    WHITE: '#FFF',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#161616',
    GREEN_100: '#E8F5E9',
    GREEN_200: '#D8F2D8',
    GREEN_300: '#C8EFC8',
    GREEN_400: '#CCE6BA',
    GREEN_500: '#A2D200',
    ...common,
},
    dark: {
    WHITE: '#161616',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5e5e5e',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F8F8F8',
    GREEN_100: '#1B2E1F',
    GREEN_200: '#2A4A2E',
    GREEN_300: '#3A5F3E',
    GREEN_400: '#4A6B4E',
    GREEN_500: '#7BA000',
    BLACK: '#fff',
    ...common,
    },
} as const;

const colorHex = {
    RED: colors['light'].PINK_700,
    BLUE: colors['light'].BLUE_400,
    GREEN: colors['light'].GREEN_400,
    YELLOW: colors['light'].YELLOW_400,
    PURPLE: colors['light'].PURPLE_400,
} as const;

export {colors, colorHex};

