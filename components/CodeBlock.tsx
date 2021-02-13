import React, { PureComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from '../lib/prism'

class CodeBlock extends PureComponent {
    render() {
        const { language, value,  }: any = this.props;

        return (
            <SyntaxHighlighter language={language} style={style} showLineNumbers={true}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default CodeBlock;