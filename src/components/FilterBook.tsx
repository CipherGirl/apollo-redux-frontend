import { useAppDispatch } from '@/Redux/hooks';
import { Input } from '@/components/ui/input';
import { setGenre, setSearch } from '@/Redux/features/filter/filterSlice';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getUniqueValuesByProp } from '@/lib/helpers';
import { IBook } from '@/types/globalTypes';

interface FilterBookProps {
  bookData: IBook[];
}

const FilterBook = ({ bookData }: FilterBookProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full flex justify-between items-center">
      <div className="relative my-6">
        <Input
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-[400px] "
          placeholder="search book.."
        />
        <img
          src="https://www.freepnglogos.com/uploads/search-png/search-icon-clip-art-clkerm-vector-clip-art-online-22.png"
          className="absolute  w-[7%] top-[6px] right-[6px]"
        />
      </div>
      <Select onValueChange={(genre) => dispatch(setGenre(genre))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter By Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Genre</SelectLabel>
            <SelectItem value="all">All Book</SelectItem>
            {bookData &&
              getUniqueValuesByProp(bookData, 'genre').map((genre, index) => (
                <SelectItem value={genre} key={index}>
                  {genre}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBook;
