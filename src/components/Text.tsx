import { colors } from 'assets/Colors'
import { Fonts } from 'assets/Font'
import React, { useMemo } from 'react'
import { Platform, StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native'

interface TextProps extends RNTextProps {
    type?: "black" | "blackItalic" | "bold" | "boldItalic" | "extraBold" | "extraBoldItalic" | "extraLight" | "extraLightItalic" | "italic" | "light" | "lightItalic" | "medium" | "mediumItalic" | "regular" | "semiBold" | "semiBoldItalic" | "thin" | "thinItalic",

}

const Text = (props: TextProps) => {
    const { type = 'regular', style, ...rest } = props

    const styles = useMemo(() => {
        const styles = StyleSheet.flatten(style ?? {})
        let fontType = type
        if (Platform.OS == 'android') {
            fontType = type;
            if (styles.fontWeight) {
                switch (styles?.fontWeight) {
                    case "500":
                        fontType = `medium`
                        break;

                    case "600":
                        fontType = "semiBold"
                        break;

                    case "700":
                        fontType = "bold"
                        break;

                    case "800":
                        fontType = "extraBold"
                        break;

                }
            }
            if (styles?.fontStyle == 'italic' && fontType != 'regular') {
                //@ts-ignore
                fontType = fontType?.replace('Italic', '') + "Italic"
                delete styles.fontStyle
            }
        }

        return StyleSheet.create({
            textStyle: {
                color: colors.colorBlackText,
                fontFamily: Fonts?.[Platform.OS == 'android' ? fontType : type],
                ...styles,
                fontWeight: Platform.OS == 'android' ? undefined : styles?.fontWeight,
            }
        })
    }, [style, type])

    return <RNText  {...rest} style={styles.textStyle} allowFontScaling={false}
        suppressHighlighting={true} />

}

export default Text