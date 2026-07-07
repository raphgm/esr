#!/bin/bash
grep -o 'https://images.unsplash.com/photo-[a-zA-Z0-9-]*' src/mockData.ts | sort -u | while read url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url?auto=format&fit=crop&q=80&w=300")
  if [ "$status" != "200" ]; then
    echo "Broken: $url (Status: $status)"
  fi
done
