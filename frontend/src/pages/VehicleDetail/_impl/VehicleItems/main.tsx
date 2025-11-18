import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { VehicleItemsProps } from './types';
import type { VehicleItem } from '@/domain/vehicle';

const ITEMS_LIMIT = 10;

const groupItemsByCategory = (items: VehicleItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = [];
    }
    acc[item.categoria].push(item);
    return acc;
  }, {} as Record<string, VehicleItem[]>);
};

const ItemCategory = ({
  category,
  items,
  isSafety,
}: {
  category: string;
  items: VehicleItem[];
  isSafety: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = items.length > ITEMS_LIMIT;
  const displayedItems = isExpanded ? items : items.slice(0, ITEMS_LIMIT);

  return (
    <div className="space-y-3">
      <h4 className={`text-lg font-semibold ${isSafety ? 'text-red-600' : 'text-foreground'}`}>
        {category}
        {isSafety && ' ⚠️'}
      </h4>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayedItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <span className="text-primary-500">✓</span>
            <span>{item.nome}</span>
          </li>
        ))}
      </ul>
      {shouldShowButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2"
        >
          {isExpanded ? 'Ver menos' : `Ver mais (${items.length - ITEMS_LIMIT} itens)`}
        </Button>
      )}
    </div>
  );
};

export const VehicleItems = ({ items }: VehicleItemsProps) => {
  const seriesGrouped = groupItemsByCategory(items.itens_serie);
  const optionalsGrouped = items.opcionais ? groupItemsByCategory(items.opcionais) : {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens e Opcionais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Itens de Série</h3>
          {Object.entries(seriesGrouped).map(([category, categoryItems]) => (
            <ItemCategory
              key={category}
              category={category}
              items={categoryItems}
              isSafety={category.toLowerCase() === 'segurança'}
            />
          ))}
        </div>

        {Object.keys(optionalsGrouped).length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold text-foreground">Opcionais</h3>
            {Object.entries(optionalsGrouped).map(([category, categoryItems]) => (
              <ItemCategory
                key={category}
                category={category}
                items={categoryItems}
                isSafety={category.toLowerCase() === 'segurança'}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
