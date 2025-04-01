#!/bin/bash

# 이미지를 webp로 변환하고 원본 파일을 삭제하는 함수
convert_to_webp_and_remove() {
    local file="$1"
    local dir=$(dirname "$file")
    local filename=$(basename "$file")
    local name="${filename%.*}"
    
    # cwebp 명령어로 변환
    cwebp "$file" -o "${dir}/${name}.webp"
    
    if [ $? -eq 0 ]; then
        echo "변환 완료: $file -> ${dir}/${name}.webp"
        # 변환 성공 시 원본 파일 삭제
        rm "$file"
        echo "원본 파일 삭제: $file"
    else
        echo "변환 실패: $file"
    fi
}

# 폴더를 재귀적으로 탐색하는 함수
process_directory() {
    local dir="$1"
    
    # 현재 디렉토리의 jpg, jpeg, png 파일 처리
    for file in "$dir"/*.jpg "$dir"/*.jpeg "$dir"/*.png; do
        if [ -f "$file" ]; then
            convert_to_webp_and_remove "$file"
        fi
    done
    
    # 하위 디렉토리 처리
    for subdir in "$dir"/*/ ; do
        if [ -d "$subdir" ]; then
            process_directory "$subdir"
        fi
    done
}

# 메인 실행
main() {
    if [ ! -d "./img" ]; then
        echo "오류: /img 폴더가 존재하지 않습니다."
        exit 1
    fi

    process_directory "./img"
    echo "모든 이미지 변환 및 원본 삭제가 완료되었습니다."
}

# 스크립트 실행
main
