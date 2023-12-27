import { useEffect, useState } from 'react';
import { Appearance } from 'react-native'

const Theme = (props) => {
    const [theme, setTheme] = useState('LIGHT');
    useEffect(() => {
        const colorScheme = Appearance.getColorScheme()
        //console.log("colorTheme is:", colorScheme);
        const listner = Appearance.addChangeListener(colorTheme => {
            //console.log("theme is-----------", colorTheme)

            if (colorTheme.colorScheme === 'dark') {
                setTheme('DARK');
            } else {
                setTheme('LIGHT');
            }

        });

       
        return () => {
            listner;
        }

    }, [])
    // Pass the theme to the child components
    return props.children({ theme });
};

export default Theme;