import React, { PureComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSea } from 'react-syntax-highlighter/dist/cjs/styles/prism';

class CodeBlock extends PureComponent {
    render() {
        const { language, value }: any = this.props;

        return (
            <SyntaxHighlighter language={language} style={duotoneSea}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default CodeBlock;