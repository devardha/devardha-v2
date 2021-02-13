import React, { PureComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';

class CodeBlock extends PureComponent {
    render() {
        const { language, value,  }: any = this.props;

        return (
            <SyntaxHighlighter language={language} style={nord} showLineNumbers={true}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default CodeBlock;