import React from "react";

type Item = {
  id: string;
  label: string;
  onClick: () => void;
  icon?: string;
};

type Props = {
  items: Item[];
};

const RadialMenu = ({ items }: Props) => {
  const size = 500;
  const center = size / 2;
  const outerRadius = 210;
  const innerRadius = 120;
  const anglePerItem = (2 * Math.PI) / items.length;

  return (
    <svg width={size} height={size} className="mx-auto block">
      {items.map((item, i) => {
        const startAngle = i * anglePerItem;
        const endAngle = startAngle + anglePerItem;
        const largeArcFlag = anglePerItem > Math.PI ? 1 : 0;

        // Define arco completo
        const x1Outer = center + outerRadius * Math.cos(startAngle);
        const y1Outer = center + outerRadius * Math.sin(startAngle);
        const x2Outer = center + outerRadius * Math.cos(endAngle);
        const y2Outer = center + outerRadius * Math.sin(endAngle);
        const x1Inner = center + innerRadius * Math.cos(endAngle);
        const y1Inner = center + innerRadius * Math.sin(endAngle);
        const x2Inner = center + innerRadius * Math.cos(startAngle);
        const y2Inner = center + innerRadius * Math.sin(startAngle);

        const pathData = `
          M ${x1Outer} ${y1Outer}
          A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}
          L ${x1Inner} ${y1Inner}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner}
          Z
        `;

        // Posição central do texto
        const midAngle = startAngle + anglePerItem / 2;
        const iconRadius = (outerRadius + innerRadius) / 2;
        const iconX = center + iconRadius * Math.cos(midAngle);
        const iconY = center + iconRadius * Math.sin(midAngle);

        return (
          <g
            key={item.id}
            onClick={item.onClick}
            className="cursor-pointer group interactive"
          >
            <path
              d={pathData}
              fill="#333"
              stroke="#000"
              strokeWidth="1"
              className="transition group-hover:fill-black"
            />
            <text
              x={iconX}
              y={iconY}
              fill="white"
              fontSize="18"
              textAnchor="middle"
              alignmentBaseline="middle"
              className="pointer-events-none"
            >
              {item.label}
            </text>
          </g>
        );
      })}

      {/* centro */}
      <circle cx={center} cy={center} r={50} fill="#111" />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="20"
      >
        PONTO
      </text>
    </svg>
  );
};

export default RadialMenu;
