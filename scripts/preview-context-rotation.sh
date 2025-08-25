#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting context progress bar color rotation demo...${NC}"
echo "Press Ctrl+C to exit"
echo

# Create temporary directory for mock transcripts
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Function to create mock transcript with specific token count
create_mock_transcript() {
    local tokens=$1
    local transcript_file="$TEMP_DIR/transcript_${tokens}.jsonl"
    
    # Create a mock transcript entry with the specified input token count
    cat > "$transcript_file" << EOF
{"timestamp":"2024-01-01T12:00:00.000Z","message":{"usage":{"input_tokens":${tokens},"output_tokens":100}}}
EOF
    
    echo "$transcript_file"
}

# Array of token counts to demonstrate different colors
# Context limit is 200,000, usable limit is 75% = 150,000
# Green: < 40% of 200k = < 80k tokens
# Yellow: 40-60% of 200k = 80k-120k tokens  
# Red: > 60% of 200k = > 120k tokens
declare -a token_counts=(
    "20000"   # 10% - Green
    "60000"   # 30% - Green
    "100000"  # 50% - Yellow
    "140000"  # 70% - Red
    "180000"  # 90% - Red
)

declare -a color_names=("Green" "Green" "Yellow" "Red" "Red")

# Build the project first
echo -e "${BLUE}Building project...${NC}"
npm run build > /dev/null 2>&1

counter=0
while true; do
    for i in "${!token_counts[@]}"; do
        tokens=${token_counts[$i]}
        color=${color_names[$i]}
        
        # Create mock transcript
        transcript_file=$(create_mock_transcript "$tokens")
        
        # Clear screen and show info
        clear
        echo -e "${BLUE}Context Progress Bar Color Demo${NC}"
        echo "================================="
        echo -e "Current: ${tokens} tokens (${color} zone)"
        echo -e "Cycle: $((counter + 1))"
        echo
        
        # Run the statusline with the mock transcript
        CLAUDE_TRANSCRIPT="$transcript_file" echo '{"session_id":"context-demo","workspace":{"project_dir":"'$PWD'"},"model":{"id":"claude-3-5-sonnet","display_name":"Claude"},"transcript_path":"'$transcript_file'"}' | node dist/index.js --config=./configs/context-progressbar-test.json --style=powerline
        
        echo
        echo "Press Ctrl+C to exit..."
        
        # Wait 1 second
        sleep 1
    done
    ((counter++))
done